var a = {
  name: '苏鸽',
  sex: '男',
  height: 1.68,
  age: 25,
  weight: 57,
  healthy: function () {
    let BMI = this.weight / (this.height * this.height);
    if (18.5 <= BMI < 23) {
      return '健康'
    } else {
      return '不健康'
    }
  }
}
console.log(a.healthy())
