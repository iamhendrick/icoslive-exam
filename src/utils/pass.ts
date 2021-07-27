export const passValueFormatter = (params: any) => {
  let passStatus = params.data.pass === true ? 'Pass' : 'Fail';
  return passStatus;
}