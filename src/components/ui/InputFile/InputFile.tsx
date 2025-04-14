import { cn } from "@/utils/cn";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
    name: string;
    isDropable?: boolean;
    isUploading?: boolean;
    isDeleting?: boolean;
    isInvalid?: boolean;
    clasName?: string;
    onUpload?: (files: FileList) => void;
    onDelete?: () => void;
    preview?: string;
    errorMessage?: string;
}

const InputFile = (props: PropTypes) => {
    const {
        clasName,
        isDropable = false,
        name,
        isInvalid,
        isUploading,
        isDeleting,
        errorMessage,
        onUpload,
        onDelete,
        preview
    } = props;

    const drop = useRef<HTMLLabelElement>(null);
    const dropzoneId = useId();

    // const handleDragOver = (e: DragEvent) => {
    const handleDragOver = (e: React.DragEvent) => {
        if (isDropable) {
            e.preventDefault();
            e.stopPropagation();
        };
    };

    // const handleDrop = (e: DragEvent) => {
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer?.files;
        if (files && onUpload) {
            onUpload(files);
        }
    };

    useEffect(() => {
        const dropCurrent = drop.current;
        if (dropCurrent) {
            dropCurrent.addEventListener('dragover', handleDragOver as any);
            dropCurrent.addEventListener('drop', handleDrop as any)

            return () => {
                dropCurrent.removeEventListener("dragover", handleDragOver as any);
                dropCurrent.removeEventListener("drop", handleDrop as any);
            }
        }
    }, []);

    const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && onUpload) {
            onUpload(files);
        }
    };

    return (
        <div>
            <label
                ref={drop}
                htmlFor={`dropzone-file-${dropzoneId}`} className={cn(
                    "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200",
                    clasName,
                    { "border-danger-500": isInvalid }
                )}>

                {preview &&
                    <div className="relative flex flex-col items-center justify-center p-5">
                        <div className="mb-2 w-1/2">
                            <Image fill src={preview} alt="image" className="!relative" />
                        </div>
                        <Button isIconOnly
                            onPress={onDelete}
                            disabled={isDeleting}
                            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-danger-100">
                            {isDeleting ? (
                                <Spinner size="sm" color="danger" />
                            ) : (
                                <CiTrash className="h-5 w-5 text-danger-500" />
                            )}
                        </Button>
                    </div>
                }

                {!preview && !isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
                        <p className="text-center text-sm font-semibold text-gray-500">
                            {isDropable ? "Drag n drop or click to upload" : "Click to upload file"}
                        </p>
                    </div>
                )}

                {isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <Spinner color="danger" />
                    </div>
                )}
                <input
                    name={name}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    id={`dropzone-file-${dropzoneId}`}
                    onChange={handleOnUpload}
                    disabled={preview !== ""}
                    onClick={(e) => {
                        e.currentTarget.value = "";
                        e.target.dispatchEvent(new Event("change", { bubbles: true }));
                    }}
                />
            </label >
            {isInvalid && (
                <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
            )}
        </div >
    );
};

export default InputFile;