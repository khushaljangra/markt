import mongoose from 'mongoose';

const downloadLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    maxDownloadsAllowed: {
      type: Number,
      default: 5, // Limit downloads to 5 times per purchase by default
    },
    ipAddresses: [
      {
        type: String,
      },
    ],
    lastDownloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const DownloadLog = mongoose.model('DownloadLog', downloadLogSchema);
export default DownloadLog;
