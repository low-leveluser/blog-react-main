const validationRulesMaker = (func) => ({
  username: {
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Too short. Min length 3',
    },
    maxLength: {
      value: 20,
      message: 'Too long. Max length 20',
    },
  },
  email: {
    required: 'This field is required',
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter the valid email',
    },
  },
  password: {
    required: 'This field is required',
    minLength: {
      value: 6,
      message: 'Too short. Min length 6',
    },
    maxLength: {
      value: 40,
      message: 'Too long. Max length 40',
    },
  },
  repeatPassword: {
    required: 'This field is required',
    validate: (value) => value === func('password') || 'The password must match',
  },
  imageUrl: {
    pattern: {
      value: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/,
      message: 'Enter URL of image',
    },
  },
})

export default validationRulesMaker
