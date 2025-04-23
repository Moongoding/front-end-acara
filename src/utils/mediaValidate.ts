import { ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES } from "@/constants/list.media";

export const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return `The file must be of type: ${ALLOWED_IMAGE_TYPES.join(", ")}`;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        return `Maximum file size ${MAX_FILE_SIZE_MB}MB`;
    }

    return null;
};
