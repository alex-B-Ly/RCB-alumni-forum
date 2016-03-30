var Users = {
  firstName: String,
  lastName: String,
  password: String (encrypted),
  section: Number,
  jobTitle: String,
  jobDescription: String,
  lookingForWork: Boolean,
  dateCreated: Date,
  skillsLearned:[{
    date: Date,
    skillName: String
  }],
  skills:{
    type: Schema.Types.ObjectId,
    ref: 'Skills'
  }
  messages: {
    type: Schema.Types.ObjectId,
    ref: 'Messages'
  }
}