import Notice from '../models/Notice.js';

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public
export const getNotices = async (req, res) => {
  try {
    const { category, priority, published } = req.query;
    let query = {};

    // Only show published notices to public
    if (published !== 'false') {
      query.published = true;
    }

    if (category) query.category = category;
    if (priority) query.priority = priority;

    const notices = await Notice.find(query)
      .populate('createdBy', 'name email')
      .sort({ publishedAt: -1, createdAt: -1 });

    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single notice
// @route   GET /api/notices/:id
// @access  Public
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    // Increment views
    notice.views += 1;
    await notice.save();

    res.json({
      success: true,
      data: notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create notice
// @route   POST /api/notices
// @access  Private/Admin/Teacher
export const createNotice = async (req, res) => {
  try {
    const { title, content, category, priority, targetAudience } = req.body;

    const noticeData = {
      title,
      content,
      category: category || 'general',
      priority: priority || 'medium',
      targetAudience: targetAudience ? (Array.isArray(targetAudience) ? targetAudience : [targetAudience]) : ['all'],
      createdBy: req.user.id
    };

    if (req.files && req.files.length > 0) {
      noticeData.attachments = req.files.map(file => file.path);
    }

    const notice = await Notice.create(noticeData);

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private/Admin/Teacher
export const updateNotice = async (req, res) => {
  try {
    const { title, content, category, priority, targetAudience } = req.body;

    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    // Check if user created this notice or is admin
    if (notice.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this notice'
      });
    }

    if (title) notice.title = title;
    if (content) notice.content = content;
    if (category) notice.category = category;
    if (priority) notice.priority = priority;
    if (targetAudience) {
      notice.targetAudience = Array.isArray(targetAudience) ? targetAudience : [targetAudience];
    }

    if (req.files && req.files.length > 0) {
      notice.attachments = [...(notice.attachments || []), ...req.files.map(file => file.path)];
    }

    await notice.save();

    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Publish notice
// @route   PUT /api/notices/:id/publish
// @access  Private/Admin
export const publishNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    notice.published = true;
    notice.publishedAt = new Date();
    await notice.save();

    res.json({
      success: true,
      message: 'Notice published successfully',
      data: notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private/Admin
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    await notice.deleteOne();

    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

