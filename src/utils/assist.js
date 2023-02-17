function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i += 1) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

export default oneOf;
// function oneOf<T>(value: T, validList: T[]): boolean {
//     for (let i = 0; i < validList.length; i++) {
//       if (value === validList[i]) {
//         return true;
//       }
//     }
//     return false;
//   }