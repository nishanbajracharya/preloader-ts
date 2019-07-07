interface IImageArray {
  [index: string]: HTMLImageElement;
}

interface IImageErrorArray {
  [index: string]: string | Event;
}

type OnCompleteFunction = (
  imgArray: IImageArray,
  error: boolean,
  errorObject: IImageErrorArray,
) => void;

function preloader(srcs: string[], onComplete: OnCompleteFunction) {
  const imgArray: IImageArray = {};
  const imgErrorArray: IImageErrorArray = {};

  let imgErrorCount: number = 0;
  let imgLoadedCount: number = 0;

  srcs.forEach((src, index) => {
    imgArray[index] = null;
    imgErrorArray[index] = null;

    const img: HTMLImageElement = new Image();
    img.src = src;

    img.onload = () => {
      imgLoadedCount++;

      imgArray[index] = img;

      if (imgLoadedCount + imgErrorCount === srcs.length) {
        onComplete(imgArray, !!imgErrorCount, imgErrorArray);
      }
    };

    img.onerror = (err) => {
      imgErrorCount++;

      imgErrorArray[index] = err;

      if (imgLoadedCount + imgErrorCount === srcs.length) {
        onComplete(imgArray, !!imgErrorCount, imgErrorArray);
      }
    };
  });
}
