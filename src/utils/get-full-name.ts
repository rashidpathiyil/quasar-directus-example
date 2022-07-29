export interface FullNameInterface {
  first_name?: string;
  last_name?: string;
}

// Return full name of user
export const getFullName = <T extends FullNameInterface>(user: T) => {
  if (user && user.first_name && user.last_name) {
    return user.first_name
      ? user.first_name
      : '' + ' ' + user.last_name
      ? user.last_name
      : '';
  }
};
