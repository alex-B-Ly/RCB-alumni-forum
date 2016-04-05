var Users = {
  firstName: String,
  lastName: String,
  email: String,
  password: String (encrypted),
  section: Number,
  dateCreated: Date,
  messages: {
    type: Schema.Types.ObjectId,
    ref: 'Messages'
  },
  profile:{
    pictureSrc: String,
    jobTitle: String,
    jobDescription: String,
    bio: String,
    skills:[{}]
  }
}