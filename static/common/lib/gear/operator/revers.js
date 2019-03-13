function revers(ary) {
  let list = [];
  let len = ary.length;
  while (len--) {
    list[list.length] = ary[len];
  }

  return list;
}

export default revers;
