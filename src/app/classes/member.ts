/**
 * https://angular.io/guide/forms
 */

export class Member {
    constructor(
        public member_id: number,
        public member_name: string,
        public member_gender: string,
        public member_mother? : number,
        public member_father? : number,
        public member_wifes? : string,
        public member_dob? : string,
        public member_dod? : string
      ){}
}
