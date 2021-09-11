// @flow

const getResizedImageDimensions = (maxWidth: number, maxHeight: number) =>
    (width: number, height: number) => {
        if (width > height) {
            if (width > maxWidth) {
                return [maxWidth, Math.round(height * maxWidth / width)];
            }
        }
        else if (height > maxHeight) {
            return [Math.round(width * maxHeight / height), maxHeight];
        }

        return [width, height];
    };

export const compressImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    const blobURL = window.URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;

    return new Promise<string>((res, rej) => {
        img.onerror = function () {
            window.URL.revokeObjectURL(this.src);
            console.error("Cannot load image.");
        }

        img.onload = function () {
            window.URL.revokeObjectURL(this.src);
            const [newWidth, newHeight] = getResizedImageDimensions(maxWidth, maxHeight)(img.width, img.height);
            const canvas = document.createElement("canvas");

            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            canvas.toBlob(blob => {
                const reader = new FileReader();
                reader.onloadend = () => res(String(reader.result));
                reader.onerror = e => rej(e);
                reader.readAsDataURL(blob);
            }, "image/png", 0.7);
        }
    });
}

