module.exports = {
    commonError:{
        error: true,
        message: "Terjadi Kesalahan Pada Server."
    },
    commonErrorMessage: (message) => {
        return {
            error: true,
            message: message
        }
    },
    commonSuccess: {
        error: false,
        message: "Berhasil Memuat Halaman."
    },
    commonSuccessMessage: (message) => {
        return {
            error: false,
            message: message
        }
    },
    commonResults: (data) => {
        return {
            error: false,
            message: "Berhasil Memuat Data"
        }
    }
}