import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, JobCard, JobTypes, Loading, TextInput, JobLocs } from "../components";
import { useSelector } from "react-redux";
import { apiRequest, handleFileUpload } from "../utils";

const ApplyNow = () => {
    const { user } = useSelector((state) => state.user);
    const {
      register,
      handleSubmit,
      getValues,
      watch,
      formState: { errors },
    } = useForm({
      mode: "onChange",
      defaultValues: {},
    });

  const [errMsg, setErrMsg] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [jobLoc, setJobLoc] = useState("Work From Office");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadCv, setUploadCv] = useState("");
  const [RecentApplication, setRecentApplication]=useState([])


  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrMsg(null);
    const uri = uploadCv && (await handleFileUpload(uploadCv));
    const newData = uri ? { ...data, cvUrl : uri , jobType:jobType ,jobLoc:jobLoc} : data;
    // const newData={...data,jobType:jobType};
    // const newdata={...data,jobLoc:jobLoc};
    try{
      const res = await apiRequest({
        url: "applications/apply-now",
        token: user?.token,
        data: newData,//newdata,newdata2,
        method: "POST",
      });

      if (res.status === "failed"){
        setErrMsg({...res});
      }else {
        setErrMsg({ status: "success", message:res.message});
        setTimeout(()=>{
          window.location.reload();
        }, 2000);
      }
      setIsLoading(false);
    }catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  };

//   const getRecentApplication = async ()=>{
//     try{
//       const id = user._id;

//       const res = await apiRequest({
//         url : "/jobs/get-jobs/" + id,
//         method : "GET",
//       });

//       setRecentApplication(res?.data?.Applications);
//     }catch (error) {
//       console.log (error);
//     }
//   };

//   useEffect(()=> { 
//     getRecentApplication() 
//    }, []);

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
      <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
        <div>
          <p className='text-gray-500 font-semibold text-2xl'>Application</p>

          <form
            className='w-full mt-2 flex flex-col gap-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full flex gap-4'>
              <div className={`w-1/2 mt-2`}>
                <label className='text-gray-600 text-sm mb-1'>Prefered Job Type</label>
                <JobTypes jobTitle={jobType} setJobTitle={setJobType} />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='salary'
                  label='Expected Salary (USD)'
                  placeholder='eg. 1500'
                  type='number'
                  register={register("salary", {
                    required: " required",
                  })}
                  error={errors.salary ? errors.salary?.message : ""}
                />
              </div>
            </div>

            <div className='w-full flex gap-4'>
              <div className='w-1/2'>
                <TextInput
                  name='experience'
                  label='Years of Experience'
                  placeholder='experience'
                  type='number'
                  register={register("experience", {
                    required: "required",
                  })}
                  error={errors.experience ? errors.experience?.message : ""}
                />
              </div>
            </div>

            <div className='w-full flex gap-4'>
              <div className={`w-1/2 mt-2`}>
                <label className='text-gray-600 text-sm mb-1'>Prefered Job Location</label>
                <JobLocs jobLoc={jobLoc} setJobLoc={setJobLoc} />
              </div>
              </div>
            
            <div className='flex flex-col'>
            <p className='text-gray-500 font-semibold text-1xl'>Cover Letter</p>
              <label className='text-gray-600 text-sm mb-1'>
                Why should we hire you for this role?
              </label>
              <textarea
                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                {...register("desc", {
                  required: "Required!",
                })}
                aria-invalid={errors.desc ? "true" : "false"}
              ></textarea>
              {errors.desc && (
                <span role='alert' className='text-xs text-red-500 mt-0.5'>
                  {errors.desc?.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 text-sm mb-1'>
                Resume
              </label>
              <input
                type='file'
                onChange={(e) => setUploadCv(e.target.files[0])}
            />
            </div>

            {errMsg && (
              <span role='alert' className='text-sm text-red-500 mt-0.5'>
                {errMsg}
              </span>
            )}
            <div className='mt-2'>
              {isLoading ? (
                <Loading/>
              ):(
              <CustomButton
                type='submit'
                containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                title='Apply'
              />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyNow;
