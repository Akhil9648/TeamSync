const activityLogs = async (req,res,next) => {
    try {
        const {user,action,targetType,startDate,endDate,limits=20,page=0} = req.query;
        const filter = {};
        if(user) filter.user = user;
        if(action) filter.action = action;
        if(targetType) filter.targetType = targetType;
        if(startDate || endDate) filter.timestamp={};
        if(startDate) filter.timestamp.$gte=new Date(startDate);
        if(endDate) filter.timestamp.$lte=new Date(endDate);
        const logs=await activityLogs.find(filter)
        .populate("user","name email")
        .sort({timestamp:-1})
        .skip((page-1)*limits)
        .limit(parseInt(limits));
        const total=await activityLogs.countDocuments(filter);
        res.json({
            page:parseInt(page),
            limits:parseInt(limits),
            total,
            logs
        })
    } catch (error) {
        next(error);
    }
};
const getActivityLogById=async(req,res,next)=>{
    try {
        const log=await activityLogs.findById(req.params.id)
        .populate("user","name email");
        if(!log) return res.status(404).json({message:"Log Not Found"});
        res.json(log);
    } catch (error) {
        next(error);
    }
};
export {activityLogs,getActivityLogById
}