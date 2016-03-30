var Messages = [{
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
  dateCreated: Date,
  message: String
}];