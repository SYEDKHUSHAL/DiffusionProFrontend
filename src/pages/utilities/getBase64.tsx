function convertImageToBase64(file: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader?.result === 'string') {
                resolve(reader?.result);
            } else {
                reject(new Error('Error converting image to Base64.'));
            }
        };
        reader.readAsDataURL(file);
    }).catch((error) => {
        return '';
    });
}

export default convertImageToBase64;