import { TRANGTHAI } from "../enums";

export type MenuRole = {
    idMenu?: string,
    idRole?: string[];
}

export interface VaiTro extends MenuRole {
    tenVaiTro?: string,
    moTa?: string,
    menuRole?: MenuRole[] 
    guid?: string,
    trangThai?: TRANGTHAI
}


// [
//     {
//         menuRole: [
//             {
//                 idMenu: '1',
//                 idRole: ['1', '2']
//             },
//             {
//                 idMenu: '2',
//                 idRole: ['3', '4']
//             }
//         ]
//     } 
// ]