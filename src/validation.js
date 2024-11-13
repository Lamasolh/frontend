import { extend, localize } from 'vee-validate'
import moment from 'moment'
import * as rules from 'vee-validate/dist/rules'
// import validator from 'validator'

extend('fullname', {
  params: ['title'],
  validate: value => {
    const regex = new RegExp("^[ء-ي]([-']?[ء-ي]+)*( [ء-ي]([-']?[ء-ي]+)*)+$")
    return regex.test(value)
  },
})
extend('xname', {
  params: ['title'],
  validate: value => {
    const regex = new RegExp(
      "^[ء-يa-zA-Z]([-']?[ء-يa-zA-Z]+)*( [ء-يa-zA-Z]([-']?[ء-يa-zA-Z]+)*)+$",
    )
    return regex.test(value)
  },
})
extend('nameonly', {
  // params: ['title'],

  validate: value => {
    const regex = new RegExp('!@#($)%"<:},]/.')
    return regex.test(value)
  },
})
extend('nameInArray', {
  validate: (value, args) => {
    try {
      const arg = JSON.parse(args.join(','))
      if (arg.filter(item => item.name === value).length < 2) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },
})

extend('phoneInArray', {
  validate: (value, args) => {
    try {
      const b = parseInt(args.pop().charAt(0), 10)
      const c = args.join(',')
      const arg = JSON.parse(c)
      if (
        arg.filter(item => item.phone === value && item.countryid === b)
          .length < 2
      ) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },
})
extend('itemArray', {
  validate: (value, args) => {
    try {
      const arg = JSON.parse(args.toString().split(';')[0])
      const val = JSON.parse(args.toString().split(';')[1].substring(1))
      if (
        arg.filter(item => item.name === val.name)
          .length < 2
      ) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },
})
extend('itemArrayAr', {
  validate: (value, args) => {
    try {
      const arg = JSON.parse(args.toString().split(';')[0])
      const val = JSON.parse(args.toString().split(';')[1].substring(1))
      if (
        arg.filter(item => item.name_ar === val.name_ar)
          .length < 2
      ) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },
})
extend('name', {
  // params: ['title'],
  validate: value => {
    const regex = new RegExp("^[ء-ي]([-'\\s]?[ء-ي]+)*$")
    return regex.test(value)
  },
})
extend('minmax', {
  validate(value, args) {
    const { length } = value

    return length >= args.min && length <= args.max
  },
  params: ['min', 'max'],
})
extend('phonelb', {
  validate: value => {
    const regex = new RegExp(
      '^((3|70|71|76|78|79|81)|(70|71|76|78|79|81))\\d{6}$',
    )
    return regex.test(value)
  },
})
extend('phonelbed', {
  validate: value => {
    const regex = new RegExp(
      '^((1|2|3|4|5|6|7|8|70|71|76|78|79|81)|(70|71|76|78|79|81))\\d{6}$',
    )
    return regex.test(value)
  },
})
extend('malefemale', {
  validate(value, args) {
    console.log('args', args)
    return (
      parseInt(args.male, 10) + parseInt(args.female, 10)
            === parseInt(args.family, 10)
    )
  },
  params: ['male', 'female', 'family'],
})
extend('val', {
  validate(value, args) {
    return parseInt(args.val, 10) > 0
  },
  params: ['val'],
})
extend('valfam', {
  validate(value, args) {
    return parseInt(args.val, 10) > 0
  },
  params: ['val'],
})
extend('minDate', {
  validate(value, args) {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0, 0)
    const date1 = moment(now)
    const spl = value.split('-')
    const dt = new Date(spl[0], spl[1] - 1, spl[2], 0, 0, 0)
    const check = moment(dt)
    const diff = date1.diff(check, 'days')
    return diff < args.max && diff >= 0
  },
  params: ['max'],
})
extend('zero', {
  validate(value) {
    return value > 0
  },
})
extend('childelder', {
  validate(value, args) {
    /// 0- 5
    const babies = parseInt(args.babies, 10)
    /// 6- 11
    const child = parseInt(args.child, 10)
    /// 12- 17
    const young = parseInt(args.young, 10)
    /// 18-25
    const teenager = parseInt(args.teenager, 10)
    /// 26- 64
    const adult = parseInt(args.adult, 10)
    /// 65
    const elder = parseInt(args.elder, 10)
    const family = parseInt(args.family, 10)

    return (babies + child + young + teenager + adult + elder) === family
  },
  params: ['babies', 'child', 'young', 'teenager', 'adult', 'elder', 'family'],
})
extend('infected', {
  validate(value, args) {
    return args.family >= value
  },
  params: ['family'],
})
extend('url', {
  validate(value) {
    if (value) {
      return /((https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))?[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g.test(
        value,
      )
    }
    return false
  },
  message: 'This url must be valid',
})
extend('space', {
  validate(value) {
    if (value) {
      return /^\S+$/.test(value)
    }
    return false
  },
  message: 'Do not use space',
})

localize({
  en: {
    messages: {
      nameInArray: field => `The ${field} is duplicated.`,
      phoneInArray: field => `The ${field} is duplicated.`,
      itemArray: field => `The ${field} is duplicated.`,
      itemArrayAr: field => `The ${field} is duplicated.`,
      malefemale: field => `The ${field} is incorrect.`,
      childelder: field => `The ${field} is incorrect.`,
      minmax: (min, max) => `The minimum length is ${min} & maximum length is ${max}`,
      fullname: 'the {title} is required',
      phonelb:
                'the Phone Number format is not correct (ex. 03 is not valid, 3 is valid)',
      phonelbed:
                'the Phone Number format is not correct (ex. 03 is not valid, 3 is valid)',
      name: field => `Please write ${field} in Arabic.`,
      minDate: (_, max) => `The date must be between today and ${max.toString()} days before`,
    },
  },
  ar: {
    messages: {
      nameInArray: field => `هذا ${field} مكرر.`,
      phoneInArray: field => `هذا ${field} مكرر.`,
      malefemale: field => `هذا ${field} غير صحيح`,
      childelder: 'مجموع عدد الذكور وعدد الإناث يجب ان يساوي مجموع اعداد الأفراد حسب الأعمار.',
      zero: 'يجب ان لا يتعدى صفر',
      val: 'يجب ان لا يتعدى عدد افراد العائلة',
      valfam: 'يجب ان لا يكون عدد الاإناث مع الذكور صفر',
      min_value: 'يجب ان يكون هناك مصاب واحد على الأقل',
      min: 'الحد الادنى للرقم هو 8 ارقام',
      max: 'الحد الادنى للرقم هو 10 ارقام',
      fullname: title => `الرجاء كتابة  ${title} صحيح وباللغة العربية.`,
      name: () => 'الرجاء كتابة رثم الهاتف صحيح وباللغة العربية.',
      required: 'ان هذا الحقل مطلوب.',
      phonelb: 'تنسيق رقم الهاتف غير صحيح (مثال. 03 غير صالح ، 3 صالح)',
      phonelbed: 'تنسيق رقم الهاتف غير صحيح (مثال. 03 غير صالح ، 3 صالح)',
    },
  },
})
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
