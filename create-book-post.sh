#!/bin/bash

# Check if a title was provided
if [ -z "$1" ]; then
    echo "Please provide a book title in kebab-case format"
    echo "Usage: ./create-book-post.sh book-title-here"
    exit 1
fi

# Get the title in kebab-case
KEBAB_TITLE=$1

# Convert kebab-case to Title Case
TITLE=$(echo "$KEBAB_TITLE" | sed -e 's/-/ /g' -e 's/\b\(.\)/\u\1/g')

# Get today's date
TODAY=$(date +"%Y-%m-%d")

# Create the file path
FILE_PATH="content/post/$KEBAB_TITLE.md"

# Create the content
cat > "$FILE_PATH" << EOF
+++
author = "Og Maciel"
title = "$TITLE"
date = "$TODAY"
description = "Og Maciel recommends $TITLE—a definitive take worth reading."
featured = true
tags = [
    "Book Review",
    "Fiction"
]
categories = [
    "book",
    "recommendation"
]
series = ["Book Recommendation"]
aliases = ["book-recommendation-fiction"]
thumbnail = "/images/$KEBAB_TITLE.jpeg"
+++
EOF

echo "Created new book post at $FILE_PATH" 