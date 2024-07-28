export const rules = {
  *beforeSendResponse(requestDetail, responseDetail) {
    if (requestDetail.url.indexOf("baidu")>=0) {
      const newResponse = responseDetail.response;
      newResponse.body = '-- AnyProxy Hacked! --';
      return {
        response:newResponse
      }
    }
    return {
      response:responseDetail.response
    }
  },
};
