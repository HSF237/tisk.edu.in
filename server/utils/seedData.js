// Seed data for initial setup
// Run this script to populate initial data

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { FeeStructure } from '../models/Fee.js';
import User from '../models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tisk_school');
    console.log('Connected to MongoDB');

    // Seed Fee Structures
    const feeStructures = [
      {
        class: 'Nursery',
        tuitionFee: 5000,
        developmentFee: 1000,
        libraryFee: 500,
        labFee: 0,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 7500,
        academicYear: '2024-2025'
      },
      {
        class: 'LKG',
        tuitionFee: 5500,
        developmentFee: 1000,
        libraryFee: 500,
        labFee: 0,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 8000,
        academicYear: '2024-2025'
      },
      {
        class: 'UKG',
        tuitionFee: 6000,
        developmentFee: 1000,
        libraryFee: 500,
        labFee: 0,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 8500,
        academicYear: '2024-2025'
      },
      {
        class: 'Class I',
        tuitionFee: 7000,
        developmentFee: 1500,
        libraryFee: 500,
        labFee: 500,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 10500,
        academicYear: '2024-2025'
      },
      {
        class: 'Class II',
        tuitionFee: 7500,
        developmentFee: 1500,
        libraryFee: 500,
        labFee: 500,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 11000,
        academicYear: '2024-2025'
      },
      {
        class: 'Class III',
        tuitionFee: 8000,
        developmentFee: 1500,
        libraryFee: 500,
        labFee: 500,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 11500,
        academicYear: '2024-2025'
      },
      {
        class: 'Class IV',
        tuitionFee: 8500,
        developmentFee: 1500,
        libraryFee: 500,
        labFee: 500,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 12000,
        academicYear: '2024-2025'
      },
      {
        class: 'Class V',
        tuitionFee: 9000,
        developmentFee: 1500,
        libraryFee: 500,
        labFee: 500,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 12500,
        academicYear: '2024-2025'
      },
      {
        class: 'Class VI',
        tuitionFee: 10000,
        developmentFee: 2000,
        libraryFee: 500,
        labFee: 1000,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 14500,
        academicYear: '2024-2025'
      },
      {
        class: 'Class VII',
        tuitionFee: 10500,
        developmentFee: 2000,
        libraryFee: 500,
        labFee: 1000,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 15000,
        academicYear: '2024-2025'
      },
      {
        class: 'Class VIII',
        tuitionFee: 11000,
        developmentFee: 2000,
        libraryFee: 500,
        labFee: 1000,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 15500,
        academicYear: '2024-2025'
      },
      {
        class: 'Class IX',
        tuitionFee: 12000,
        developmentFee: 2500,
        libraryFee: 500,
        labFee: 1500,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 17500,
        academicYear: '2024-2025'
      },
      {
        class: 'Class X',
        tuitionFee: 13000,
        developmentFee: 2500,
        libraryFee: 500,
        labFee: 1500,
        sportsFee: 500,
        otherFee: 500,
        totalFee: 18500,
        academicYear: '2024-2025'
      }
    ];

    // Clear existing fee structures
    await FeeStructure.deleteMany({});
    console.log('Cleared existing fee structures');

    // Insert fee structures
    await FeeStructure.insertMany(feeStructures);
    console.log('✅ Fee structures seeded successfully');

    console.log('\n✅ Seed data completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData();
}

export default seedData;
