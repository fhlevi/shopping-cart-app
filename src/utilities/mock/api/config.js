const axiosService = (path) => {
    const withPrefix = '/v1' + path;
    return new URL(withPrefix, process.env.VUE_APP_API_MOCK).toString();
}

export default axiosService;