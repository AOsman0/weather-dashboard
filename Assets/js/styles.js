// window.addEventListener("load", onReady);

//get current data time stamp
const currentDateTimeStamp = moment();
console.log(currentDateTimeStamp);

//use format method
// Saturday 7th May 20220 9:33pm
const formattedTime = currentDateTimeStamp.format("dddd,Do,MMM,YYYY h:mmP");
console.log(formattedTime);

const onReady = () => {
  console.log("data is ready");
  renderDate();
  renderTimeBlocks();
};

const renderDate = (currentDateTimeStamp) => {};
