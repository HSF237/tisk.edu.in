import Certificate from '../models/Certificate.js';

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
export const getCertificates = async (req, res) => {
    try {
        const { type } = req.query;
        let query = {};
        if (type) query.type = type;

        const certs = await Certificate.find(query).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: certs.length,
            data: certs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create certificate
// @route   POST /api/certificates
// @access  Private/Admin
export const createCertificate = async (req, res) => {
    try {
        const { title, type, link } = req.body;

        if (!link) {
            return res.status(400).json({
                success: false,
                message: 'Google Drive link is required'
            });
        }

        const certificate = await Certificate.create({
            title,
            type: type || 'Other',
            link,
            uploadedBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: 'Certificate created successfully',
            data: certificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private/Admin
export const updateCertificate = async (req, res) => {
    try {
        const { title, type, link } = req.body;
        const cert = await Certificate.findById(req.params.id);

        if (!cert) {
            return res.status(404).json({
                success: false,
                message: 'Certificate not found'
            });
        }

        if (title) cert.title = title;
        if (type) cert.type = type;
        if (link) cert.link = link;

        await cert.save();

        res.json({
            success: true,
            message: 'Certificate updated successfully',
            data: cert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
export const deleteCertificate = async (req, res) => {
    try {
        const cert = await Certificate.findById(req.params.id);

        if (!cert) {
            return res.status(404).json({
                success: false,
                message: 'Certificate not found'
            });
        }

        await cert.deleteOne();

        res.json({
            success: true,
            message: 'Certificate deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
