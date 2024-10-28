import { model, Schema } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    transactionId: {
      type: String,
      required: false,
    },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SlotModel = model<TSlot>('Slot', slotSchema);
export default SlotModel;
