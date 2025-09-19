from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse
import pandas as pd
from .models import Survey, Question, Response as SurveyResponse, Answer
from .serializers import SurveySerializer, ResponseSerializer
from accounts.permissions import IsCustomAdmin   # ✅ your custom permission


# ✅ Simple health check
def hello_world(request):
    return HttpResponse("Hello, Surveys are working!")


# ✅ Create + List Surveys
class SurveyListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":   # only admins can create
            return [IsCustomAdmin()]
        return [permissions.AllowAny()]      # anyone can list surveys

    def get(self, request):
        surveys = Survey.objects.all()
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Survey Detail (fetch single survey with questions)
class SurveyDetailView(APIView):
    permission_classes = [permissions.AllowAny]   # anyone can view a survey

    def get(self, request, pk):
        try:
            survey = Survey.objects.get(pk=pk)
        except Survey.DoesNotExist:
            return Response({"error": "Survey not found"}, status=404)

        serializer = SurveySerializer(survey)
        return Response(serializer.data)


# ✅ Submit a response
class ResponseCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]   # villagers must be logged in

    def post(self, request):
        serializer = ResponseSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(user=request.user)  # ✅ auto attach logged in user
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# ✅ Export survey responses to Excel (admin only)
# class SurveyExportExcelView(APIView):
#     permission_classes = [IsCustomAdmin]

#     def get(self, request, pk):
#         try:
#             survey = Survey.objects.get(pk=pk)
#         except Survey.DoesNotExist:
#             return Response({"error": "Survey not found"}, status=404)

#         responses = SurveyResponse.objects.filter(survey=survey).prefetch_related("answers")
#         data = []

#         for r in responses:
#             row = {"user": r.user.username, "submitted_at": r.submitted_at}
#             for ans in r.answers.all():
#                 row[ans.question.text] = ans.answer_text
#             data.append(row)

#         if not data:
#             return Response({"message": "No responses yet"}, status=404)

#         df = pd.DataFrame(data)
#         response = HttpResponse(content_type="application/vnd.ms-excel")
#         response["Content-Disposition"] = f'attachment; filename="{survey.title}.xlsx"'
#         df.to_excel(response, index=False)
#         return response


class SurveyExportExcelView(APIView):
    """
    Export all responses of a survey to an Excel file.
    Admin-only access.
    """
    permission_classes = [IsCustomAdmin]

    def get(self, request, pk):
        try:
            survey = Survey.objects.get(pk=pk)
        except Survey.DoesNotExist:
            return Response({"error": "Survey not found"}, status=404)

        # Fetch all responses with answers
        responses = SurveyResponse.objects.filter(survey=survey).prefetch_related("answers__question")
        data = []

        # Get all questions in survey (to ensure consistent column order)
        questions = survey.questions.all()

        for r in responses:
            # Format submitted_at as string (timezone-naive)
            row = {
                "user": str(r.user),
                "submitted_at": r.submitted_at.strftime("%Y-%m-%d %H:%M:%S"),
            }

            # Map answers by question id for consistent ordering
            answer_map = {a.question_id: a.answer_text for a in r.answers.all()}
            for q in questions:
                row[q.text] = answer_map.get(q.id, "")
            data.append(row)

        if not data:
            return Response({"message": "No responses yet"}, status=404)

        # Create pandas DataFrame
        df = pd.DataFrame(data)

        # Prepare HTTP response with proper MIME type
        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response["Content-Disposition"] = f'attachment; filename="{survey.title}.xlsx"'

        # Write DataFrame to Excel
        df.to_excel(response, index=False)

        return response
