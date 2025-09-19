from django.db import models
from django.conf import settings   # <-- important


class Survey(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    survey = models.ForeignKey(Survey, related_name="questions", on_delete=models.CASCADE)
    text = models.CharField(max_length=500)

    QUESTION_TYPES = [
        ("text", "Text"),
        ("number", "Number"),
        ("choice", "Multiple Choice"),
    ]
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default="text")
    options = models.TextField(
        blank=True,
        help_text="Comma separated values for choices (used only if question_type=choice)",
    )

    def __str__(self):
        return f"{self.survey.title} - {self.text}"


class Response(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # <-- changed here
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response by {self.user} for {self.survey.title}"


class Answer(models.Model):
    response = models.ForeignKey(Response, related_name="answers", on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField()

    def __str__(self):
        return f"{self.question.text}: {self.answer_text}"
