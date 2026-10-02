import re

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


STOP_WORDS = set(
    stopwords.words("english")
)

STOP_WORDS = STOP_WORDS - {
    "no",
    "not",
    "nor",
    "never"
}

lemmatizer = WordNetLemmatizer()


def clean_text(text: str) -> str:

    if not isinstance(text, str):
        return ""

    text = text.lower()

    text = re.sub(
        r"<.*?>",
        " ",
        text
    )

    text = re.sub(
        r"http\S+|www\S+",
        " ",
        text
    )

    text = re.sub(
        r"[^a-z\s]",
        " ",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    ).strip()

    tokens = text.split()

    tokens = [
        lemmatizer.lemmatize(word)
        for word in tokens
        if word not in STOP_WORDS
    ]

    return " ".join(tokens)