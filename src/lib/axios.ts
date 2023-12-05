import axios from "axios"

const moodleApiUrl = "https://cursos.devit-se.com.br"

export const api = axios.create({ 
    baseURL: moodleApiUrl,
});
