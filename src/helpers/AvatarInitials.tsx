const AvatarInitials = (fullName: string = '') => {
  let initials: any = fullName.match(/\b\w/g) || [];

  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

  return initials;
}

export default AvatarInitials;
