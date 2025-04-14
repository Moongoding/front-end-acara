import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import IFileURL from "@/types/File";

const formDataHeader = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

const uploadServices = {
    uploadFile: (payload: FormData) =>
        instance.post(`${endpoint.MEDIA}/upload-single`, payload, formDataHeader),

    deleteFile: (payload: IFileURL) =>
        instance.delete(`${endpoint.MEDIA}/remove`, { data: payload })
}


export default uploadServices;