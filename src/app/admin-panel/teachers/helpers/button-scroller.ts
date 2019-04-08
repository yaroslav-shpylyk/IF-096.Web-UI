// export const imageEncoder = {
//   onFileSelected(event) {
//     console.log('object');
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = this._handleReaderLoaded.bind(this);
//     reader.readAsDataURL(file);
//   },

//   _handleReaderLoaded(e) {
//     const reader = e.target;
//     if (this.editMode) {
//       this.teacher.avatar = reader.result;
//     } else {
//       this.ava = reader.result;
//     }
//   }
// };

export function scroll() {
  let prevScrollpos = window.pageYOffset;
  window.onscroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('mine').style.bottom = '3.5em';
    } else {
      document.getElementById('mine').style.bottom = '-75px';
    }
    prevScrollpos = currentScrollPos;
  };
}
