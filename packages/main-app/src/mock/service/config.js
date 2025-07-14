import Service from '../../config/service';

const axiosService = (path) => {
    const withPrefix = '/api/v1' + path;
    return new URL(withPrefix, Service.API).toString();
}

export default axiosService;