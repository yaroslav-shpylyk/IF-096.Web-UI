import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of, BehaviorSubject } from 'rxjs';

export function imageValidator( blob: BehaviorSubject<any>)  {
  return ( control: AbstractControl ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {

    const imgTypes = new Set(['89504e47', 'ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2', 'ffd8ffe3', 'ffd8ffe8' ]);
    const fileReader = new FileReader();

    return Observable.create(
      (observer: Observer< { [key: string]: any } >) => {
        fileReader.addEventListener('loadend', () => {
          const arr = new Uint8Array((fileReader.result) as ArrayBuffer).subarray(0, 4);
          let isValid = false;
          const fileHeader = arr.reduce(
            (reducer, byte) => reducer + byte.toString(16) , ''
          );
          if (imgTypes.has(fileHeader)) { isValid = true; }
          if (isValid) {
            observer.next(null);
          } else {
            observer.next({ invalidMimeType: true });
          }
          observer.complete();
        });
        fileReader.readAsArrayBuffer(blob.value);
      }
    );
  };
}
