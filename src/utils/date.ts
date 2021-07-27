export const dateComparator = (date1: string, date2: string) => {
  let rawFirstDate = monthToNum(date1);
  var rawSecondDate = monthToNum(date2);

  if (rawFirstDate === null && rawSecondDate === null) {
    return 0;
  }
  if (rawFirstDate === null) {
    return -1;
  }
  if (rawSecondDate === null) {
    return 1;
  }

  return rawFirstDate - rawSecondDate;
}

export const monthToNum = (date: string) => {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  let yearNumber: any = date.substring(6, 10);
  let monthNumber: any = date.substring(3, 5);
  let dayNumber: any = date.substring(0, 2);

  let convertionResult = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  return convertionResult;
};

export const dateValueFormatter = (params: any) => {
  let dateOfBirth = params.data.birthday;
  var rawDateOfBirth = dateOfBirth.split("/");
  return `${rawDateOfBirth[0]}/${rawDateOfBirth[1]}/${rawDateOfBirth[2]}`;
};