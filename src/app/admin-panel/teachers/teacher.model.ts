export class Teacher {
  public avatar: string;
  public dateOfBirth: string;
  public email: string;
  public firstname: string;
  public id: number;
  public lastname: string;
  public login: string;
  public patronymic: string;
  public phone: number;

  constructor(
    avatar: string,
    dateOfBirth: string,
    email: string,
    firstname: string,
    id: number,
    lastname: string,
    login: string,
    patronymic: string,
    phone: number
  ) {
    this.avatar = avatar;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.firstname = firstname;
    this.id = id;
    this.lastname = lastname;
    this.login = login;
    this.patronymic = patronymic;
    this.phone = phone;
  }
}
