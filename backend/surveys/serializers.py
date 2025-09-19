from rest_framework import serializers
from django.db import transaction
from .models import Survey, Question, Response, Answer


# --- Question Serializer (readonly) ---
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "text", "question_type", "options"]

class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, required=False)

    class Meta:
        model = Survey
        fields = ["id", "title", "description", "created_at", "questions"]

    def create(self, validated_data):
        # Extract questions if included
        questions_data = validated_data.pop("questions", [])
        survey = Survey.objects.create(**validated_data)

        for q_data in questions_data:
            Question.objects.create(survey=survey, **q_data)

        return survey

    def update(self, instance, validated_data):
        questions_data = validated_data.pop("questions", [])
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.save()

        # Replace questions if passed
        if questions_data:
            instance.questions.all().delete()
            for q_data in questions_data:
                Question.objects.create(survey=instance, **q_data)

        return instance


# --- Answer Serializer ---
class AnswerSerializer(serializers.ModelSerializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())

    class Meta:
        model = Answer
        fields = ["id", "question", "answer_text"]


# --- Response Serializer (main one) ---
class ResponseSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Response
        fields = ["id", "survey", "submitted_at", "answers"]
        read_only_fields = ["submitted_at", "user"]

    def validate(self, data):
        survey = data.get("survey")
        for ans in data.get("answers", []):
            q = ans["question"]
            if isinstance(q, int):  # handle if just ID comes
                from .models import Question
                q = Question.objects.get(pk=q)

            if q.survey_id != survey.id:
                raise serializers.ValidationError(
                    f"Question '{q.text}' does not belong to survey '{survey.title}'."
                )
        return data

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user if request and request.user.is_authenticated else None

        # Ensure no duplicate 'user' sneaks in
        validated_data.pop("user", None)

        answers_data = validated_data.pop("answers")

        with transaction.atomic():
            response = Response.objects.create(user=user, **validated_data)
            for ans in answers_data:
                Answer.objects.create(response=response, **ans)

        return response
