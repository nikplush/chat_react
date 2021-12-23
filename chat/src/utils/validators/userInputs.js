import { Schema } from 'rsuite'

export const validationModel = Schema.Model({
  userName: Schema.Types.StringType()
    .minLength(2)
    .isRequired('This field is required.'),
  password: Schema.Types.StringType().isRequired('This field is required.')
  .addRule((value, data) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)
  }, 'Password must contain minimum eight characters, one number and one special character')
})
