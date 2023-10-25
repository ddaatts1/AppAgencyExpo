export type LoginDto = {
  username: string;
  password: string;
};
export type UserDto = {
  id: number,
  username: string;
  password: string;
};

export type SessionDto = {
  token: string;
  user: UserDto;
  expiration: string;
};
export type UserPass = {
  isSwitch: boolean,
  username: string;
  password: string;
};