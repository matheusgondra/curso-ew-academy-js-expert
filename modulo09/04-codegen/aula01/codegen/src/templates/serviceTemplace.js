const template = `
export default class ProductService {
    constructor({ repository: productRepository }) {
        this.productRepository = productRepository;
    }

    create(data) {
        return this.productRepository.create(data);
    }

    read(query) {
        return this.productRepository.read(data);
    }

    update(id, data) {
        return this.productRepository.update(id, data);
    }

    delete(id) {
        return this.productRepository.delete(id);
    }
}`;

export function serviceTemplate(componentName) {
    return {
        fileName: `${componentName}Service`,
        template
    }
}