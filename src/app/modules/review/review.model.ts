import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const reviewSchema = new Schema<TReview>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const Review = model<TReview>('Review', reviewSchema)

export default Review