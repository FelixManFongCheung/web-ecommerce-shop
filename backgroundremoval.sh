#!/bin/bash

# Advanced background removal script (no background added)
# Usage: ./backgroundremoval.sh input.png output.png

if [ $# -ne 2 ]; then
    echo "Usage: $0 <input_file> <output_file>"
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_FILE="$2"

# Create a temporary file for the mask
TEMP_MASK="temp_mask.png"

# Step 1: Create a mask for background removal
magick "$INPUT_FILE" \
    -fuzz 15% \
    -fill black \
    -draw 'color 0,0 floodfill' \
    -fill white \
    -draw 'color 0,0 floodfill' \
    -fill black \
    -draw 'color 0,0 floodfill' \
    "$TEMP_MASK"

# Step 2: Apply the mask (transparent background, no grey)
magick "$INPUT_FILE" \
    "$TEMP_MASK" \
    -compose CopyOpacity \
    -composite \
    "$OUTPUT_FILE"

# Clean up temporary file
rm "$TEMP_MASK"

# Step 3: Convert to HEIC if the output file exists and is not already HEIC
if [ -f "$OUTPUT_FILE" ]; then
    # Get the file extension
    OUTPUT_EXT="${OUTPUT_FILE##*.}"
    
    # Check if it's not already HEIC
    if [[ "$OUTPUT_EXT" != "heic" && "$OUTPUT_EXT" != "HEIC" ]]; then
        # Create HEIC filename
        HEIC_FILE="${OUTPUT_FILE%.*}.heic"
        
        echo "Converting to HEIC format..."
        magick "$OUTPUT_FILE" "$HEIC_FILE"
        
        if [ -f "$HEIC_FILE" ]; then
            echo "HEIC conversion completed. HEIC file saved to: $HEIC_FILE"
            # Optionally remove the original non-HEIC file
            # rm "$OUTPUT_FILE"
        else
            echo "Warning: HEIC conversion failed"
        fi
    else
        echo "Output file is already in HEIC format"
    fi
else
    echo "Error: Output file was not created"
    exit 1
fi

echo "Background removal completed. Output saved to: $OUTPUT_FILE"