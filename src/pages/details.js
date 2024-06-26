import { Card, CardContent, Container, Grid, Typography, TextField, Box, CircularProgress, Divider, InputAdornment, IconButton, Button } from '@mui/material';
import { People as PeopleIcon, LocationOn as LocationOnIcon, Business as BusinessIcon, Rocket as RocketIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { openLink } from '../utils.js';
import internshipImage from '../assets/internshipImage.svg';
import cofounderImage from '../assets/cofounderImage.svg';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';


// Things to set :
// jobStartUpDetails.stage, jobStartUpDetails.companyPhoto, jobStartUpDetails.socials
// jobStartUpDetails.founderImage
export default function Details({ BASE_URL, startUpDetails }) {
  const { jobId } = useLocation().state;
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [jobDetails, setJobDetails] = useState([]);
  const [jobStartUpDetails, setJobStartUpDetails] = useState(startUpDetails);
  const [isadmin, setisadmin] = useState(false);
  const navigate = useNavigate();

  const checkadmin = async () => {
    const adminCode = localStorage.getItem('adminCode');
    if (adminCode) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: adminCode }),
      };
      const url = `${process.env.REACT_APP_ADMIN_URL}/auth`;
      try {
        await fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.message === 'approved') {
              setisadmin(true);
            } else {
              console.log(data);
            }
          });
      } catch (error) {
        console.log('error');
      }
    }
  };
  const getStartUpDetails = async (startUpId) => {
    setLoading2(true);
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `${BASE_URL}/api/startUp/register/${startUpId}`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setJobStartUpDetails(data.startUpDetails);
            setLoading2(false);
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getJobDetails = async (e) => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = `${BASE_URL}/api/student/jobs/${jobId}`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            if (jobStartUpDetails === null) {
              getStartUpDetails(data.jobDetails.startUpId);
            }
            setJobDetails(data.jobDetails);
            setLoading(false);
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobDetails();
    checkadmin();
  }, []);

  return (
    <Container sx={{ py: 2, mt: 9, gap: 5 }}>
      <Card sx={{ padding: [1, 5, 10] }}>
        <CardContent>
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'left',
              }}
            >
              {startUpDetails != null && (
                <Button
                  sx={{
                    padding: '1px 20px 1px 20px',
                    margin: {
                      xs: '1px 4px 80px 0px',
                      sm: '1px 4px 80px 0px',
                      md: '1px 4px 80px 0px',
                      lg: '1px 4px 80px 0px',
                    },
                    fontSize: '20px',
                    gap: 1,
                    backgroundColor: '#1976d2',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#0f4b85',
                      color: 'white',
                    },
                  }}
                  size="large"
                  onClick={() => {
                    navigate('../addNew', {
                      state: {
                        type: jobDetails.type,
                        companyName: jobStartUpDetails.companyName,
                        startUpId: jobStartUpDetails.id,
                        jobId: jobId,
                      },
                    });
                  }}
                >
                  <BorderColorRoundedIcon />
                  EDIT
                </Button>
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 200,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <img
                    src={jobStartUpDetails.companyPhoto ? jobStartUpDetails.companyPhoto : internshipImage}
                    alt="Company"
                    style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: ['column', 'row'],
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      // Left one
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 1,
                      gap: 2,
                      width: ['100%', '60%'],
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'inline-flex',
                      }}
                    >
                      <TextField
                        variant="standard"
                        fullWidth
                        value={jobStartUpDetails.companyName}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        sx={{
                          '& input': {
                            fontSize: '32px',
                            color: 'primary',
                            cursor: 'pointer',
                          },
                        }}
                      />
                    </Grid>
                    <Box sx={{ display: 'flex', padding: 1, gap: 1, flexDirection: ['row', 'column', 'row'] }}>
                      <Grid item xs={12} md={6} sx={{ border: '1px solid  #fff', borderRadius: '10px', textAlign: 'center', flex: 1 }}>
                        <TextField
                          color="primary"
                          variant="standard"
                          // label="Sector"
                          fullWidth
                          value={jobStartUpDetails.sector ? jobStartUpDetails.sector : 'Technology'}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton disabled>
                                  <BusinessIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& input': { cursor: 'pointer', color: 'black', textAlign: 'left' },
                            '& label': { textAlign: 'center' },
                            root: { textAlign: 'center' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ border: '1px solid  #fff', borderRadius: '10px', textAlign: 'center', flex: 1 }}>
                        <TextField
                          color="primary"
                          variant="standard"
                          // label="Location"
                          fullWidth
                          // value={jobStartUpDetails.location}
                          value={jobStartUpDetails.stage ? jobStartUpDetails.stage : 'Early Stage'}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton disabled>
                                  <RocketIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& input': { cursor: 'pointer', color: 'black', textAlign: 'left' },
                            '& label': { textAlign: 'center' },
                            root: { textAlign: 'center' },
                          }}
                        />
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', padding: 1, gap: 1, flexDirection: ['row', 'column', 'row'] }}>
                      <Grid item xs={12} md={6} sx={{ border: '1px solid  #fff', borderRadius: '10px', textAlign: 'center', flex: 1 }}>
                        <TextField
                          color="primary"
                          variant="standard"
                          // label="No of Employees"
                          // fullWidth
                          value={jobStartUpDetails.noOfEmployees ? jobStartUpDetails.noOfEmployees + ' People' : '1 Person'}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton disabled>
                                  <PeopleIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& input': { cursor: 'pointer', color: 'black', textAlign: 'left' },
                            '& label': { textAlign: 'center' },
                            root: { textAlign: 'center' },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ border: '1px solid  #fff', borderRadius: '10px', textAlign: 'center', flex: 1 }}>
                        <TextField
                          variant="standard"
                          fullWidth
                          value={jobStartUpDetails.location ? jobStartUpDetails.location : 'India'}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true,
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton disabled>
                                  <LocationOnIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& input': { cursor: 'pointer', color: 'black', textAlign: 'left' },
                            '& label': { textAlign: 'center' },
                            root: { textAlign: 'center' },
                          }}
                        />
                      </Grid>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      // Right one
                      alignContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #fff',
                      borderRadius: '10px',
                      textAlign: 'center',
                      padding: 2,
                      flex: [0, 1],
                      width: ['100%'],
                    }}
                  >
                    <TextField
                      variant="standard"
                      fullWidth
                      value={'Socials'}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      sx={{
                        '& input': {
                          fontSize: '16px', // Set the desired font size
                          color: 'Black', // Set the desired text color
                          cursor: 'pointer',
                        },
                      }}
                    />
                    {!isadmin && (
                      <Grid item xs={12} md={6}>
                        <TextField variant="standard"
                        //  label="Email"
                          fullWidth value={jobStartUpDetails.email} InputProps={{ disableUnderline: true, readOnly: true }} 
                         InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded" }}}
                        
                        />
                      </Grid>
                    )}
                    {!isadmin && jobStartUpDetails.linkedIn && jobStartUpDetails.linkedIn !== '' && jobStartUpDetails.linkedIn !== undefined ? (
                      <Grid item xs={12} md={6}>
                        <div
                        
                          onClick={() => {
                            openLink(jobStartUpDetails.linkedIn);
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecorationColor: '#1976d2',
                            textUnderlineOffset: 2,
                          }}
                        >
                          <TextField
                            color="primary"
                            variant="standard"
   
//                             label="LinkedIn"
                            fullWidth

                            value={jobStartUpDetails.linkedIn}     
                            InputProps={{ disableUnderline: true, readOnly: true }}
                            sx={{ input: { cursor: 'pointer', color: '#1976d2' } }}
                          />
                        </div>
                      </Grid>
                    ) : (
                      <></>
                    )}
                    {!isadmin && jobStartUpDetails.socials && jobStartUpDetails.socials !== '' && jobStartUpDetails.socials !== undefined ? (
                      <Grid item xs={12} md={6}>
                        <div
                          onClick={() => {
                            openLink(jobStartUpDetails.socials);
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecorationColor: '#1976d2',
                            textUnderlineOffset: 2,
                          }}
                        >
                          <TextField
                            color="primary"
                            variant="standard"
                            label="Socials"
                            fullWidth
                            value={jobStartUpDetails.socials}
                            InputProps={{ disableUnderline: true, readOnly: true }}
                            sx={{ input: { cursor: 'pointer', color: '#1976d2' } }}
                          />
                        </div>
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            jobStartUpDetails.companyVision && (
              <Box>
                <Typography variant="h5" sx={{ mb: 2, fontSize: '24px', color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
                  Company Vision
                </Typography>
                <Grid item xs={12}>
                  <TextField variant="standard" multiline fullWidth value={jobStartUpDetails.companyVision} InputProps={{ disableUnderline: true, readOnly: true }} />
                </Grid>
              </Box>
            )
          )}
          <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" sx={{ mb: 2, fontSize: '24px', color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
                Founders
              </Typography>
              {jobStartUpDetails.founder.map((value, key) => {
                return (
                  value.name !== '' &&
                  value.name !== undefined && (
                    <Box>
                      <Card variant="outlined" sx={{ mt: 2 }} key={key}>
                        <CardContent sx={{ display: { xs: 'block', md: 'flex' }, gap: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flex: 1,
                            }}
                          >
                            <Box //Left Photo Box.
                              sx={{
                                width: 100,
                                display: { xs: 'none', sm: 'block' },
                              }}
                            >
                              <img
                                src={jobStartUpDetails.founderImage ? jobStartUpDetails.founderImage : cofounderImage}
                                alt="Company"
                                style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                              />
                            </Box>
                            <Box //Right Content Box. ( a column )
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'left',
                                alignItems: 'left',
                                width: '100%',
                                flex: 1,
                                padding: '2px 1px 1px 20px',
                              }}
                            >
                              <Box //Top row
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'left',
                                  alignItems: 'left',
                                  flex: 1,
                                  width: '100%',
                                }}
                              >
                                <Grid item xs={12} md={6} sx={{ textAlign: 'left', minWidth: 0, width: 'auto' }}>
                                  <TextField
                                    variant="standard"
                                    label=""
                                    sx={{
                                      mb: { xs: 2, md: 0 },
                                      '& input': {
                                        fontSize: '24px', // Set the desired font size
                                        color: 'black', // Set the desired text color
                                        cursor: 'pointer',
                                      },
                                    }}
                                    value={value.name}
                                    InputProps={{
                                      disableUnderline: true,
                                      readOnly: true,
                                    }}
                                  />
                                </Grid>
                                {!isadmin && jobStartUpDetails.socials && jobStartUpDetails.socials !== '' && jobStartUpDetails.socials !== undefined ? (
                                  <Grid sx={{ textAlign: 'left', minWidth: 0, width: '100%' }}>
                                    <IconButton
                                      onClick={() => window.open(value.linkedIn, '_blank')}
                                      sx={{
                                        '&:hover': {
                                          backgroundColor: 'transparent', // Set the desired hover background color
                                        },
                                      }}
                                    >
                                      <LinkedInIcon
                                        sx={{
                                          fontSize: '30px',
                                          color: '#0A66C2',
                                        }}
                                      />
                                    </IconButton>
                                  </Grid>
                                ) : (
                                  <></>
                                )}
                              </Box>
                              <Box //Bottom row
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flex: 1,
                                  width: '100%',
                                  padding: '0px 4px 4px 4px',
                                }}
                              >
                                <Grid item xs={12} md={6} sx={{ display: 'flex', textAlign: 'center', flex: 1 }}>
                                  <TextField
                                    variant="standard"
                                    sx={{ mb: { xs: 2, md: 0 } }}
                                    fullWidth
                                    multiline
                                    value={
                                      value.bio
                                        ? value.bio
                                        : "Due to technical or logistical constraints, the startup's founder encountered challenges in providing a biography. Despite the obstacles, efforts are ongoing to overcome these issues and share the founder's story, ensuring a comprehensive and engaging representation of their journey within the startup ecosystem. "
                                    }
                                    InputProps={{
                                      disableUnderline: true,
                                      readOnly: true,
                                    }}
                                  />
                                </Grid>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  )
                );
              })}
            </Box>
          )}
          <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2, fontSize: '24px', color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
            About The Role
          </Typography>
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) :
          
          











          
          
          (
            <Grid container spacing={0} >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: "flex-start",
                  // border:"1px solid black",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap:"wrap",
                    justifyContent: 'left',
                    alignItems: 'left',
                    width: '100%',
                    // border:"1px solid red",
                    flex:1,
                    flexGrow:'',
                    padding: '2px 1px 1px 20px',
                  }}
                >  
                  {jobDetails.designation && (
                    <Grid item  xs={12} sm={6} md={4} mb={5} >
                      <TextField
                        variant="standard"
                        label={"Designation"}
                        fullWidth
                       
                        value={jobDetails.designation}
                        InputProps={{ disableUnderline: true, readOnly: true,
                          style:{marginBottom:'5px' } }} 
                         InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                       
                      />
                    </Grid>
                  )}
                  {jobDetails.type !== 'Project' && jobDetails.responsibilities && (
                    <Grid item xs={12} sm={6} md={4} mb={5}>
                      <TextField variant="standard" multiline 
                      fullWidth 
                      label={"Responsibilities"}
                      value={jobDetails.responsibilities} 
                     

                      InputProps={{ disableUnderline: true, readOnly: true }}
                       InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                       sx={{
                        '& input': { fontWeight:"bold",cursor: 'pointer', color: 'black', fontSize: "15px" }}}
                       />
                    </Grid>
                  )}
                  {jobDetails.type === 'Internship' && jobDetails.hoursType && (
                    <Grid item xs={12} sm={6} md={4} mb={5}>
                      <TextField
                        variant="standard"
                        multiline
                        fullWidth
                        label={"Type"}
                        value={jobDetails.hoursType || '( PartTime )'}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                        padding="4px 0px 0px 0px"
                        sx={{
                          '& input': { fontWeight:"bold",cursor: 'pointer', color: 'black', fontSize: "15px" }}}
                      />
                    </Grid>
                  )} 
                  {jobDetails.type === 'Project' && (
                    <>
                      {/* {jobDetails.skillsRequired && (
                        <Grid item xs={12} md={6}>
                          <TextField variant="standard" label="Skills Required" multiline fullWidth
                           value={jobDetails.skillsRequired}
                          
                           
                           InputProps={{ disableUnderline: true, readOnly: true }}
                           InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                           sx={{
                            '& input': { fontWeight:"bold",cursor: 'pointer', color: 'red', fontSize: "15px" }}}
                           
                           />
                        </Grid>
                      )} */}
                      {jobDetails.responsibilities && (
                        <Grid item xs={12} sm={6} md={4} mb={5}>
                          <TextField variant="standard" label="Project Description" multiline fullWidth 
                       
                          value={jobDetails.responsibilities || 'Unavailable'} 
                          
                          InputProps={{ disableUnderline: true, readOnly: true }} 
                           InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                           sx={{
                            '& input': { fontWeight:"bold",cursor: 'pointer', color: 'black', fontSize: "15px" }}}
                           />
                        </Grid>
                      )}
                    </>
                  )}
              

              
                  {jobDetails.type === 'Internship'
                    ? jobDetails.duration && (
                        <Grid item xs={12} sm={6} md={4} mb={5}>
                          <TextField variant="standard" label="Internship Duration" fullWidth value={jobDetails.duration} InputProps={{ disableUnderline: true, readOnly: true,
                            style:{marginBottom:'5px'} }}
                           InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}} />
                        </Grid>
                      )
                    : jobDetails.type && (
                        <Grid item xs={12} sm={6} md={4} mb={5}>
                          <TextField variant="standard" label="Type" fullWidth value={jobDetails.type} InputProps={{ disableUnderline: true, readOnly: true,
                            style:{marginBottom:'5px'} }} 
                           InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}/>
                        </Grid>
                      )}


                  {jobDetails.type !== 'Project' && (
                    <>
                      {jobDetails.stipend && (
                        <Grid item xs={12} sm={6} md={4} mb={5}>
                          <TextField variant="standard" label="Stipend" fullWidth value={jobDetails.stipend} 
                          InputProps={{ disableUnderline: true, readOnly: true,
                            style:{marginBottom:'5px'} }}  
                            InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                          
                          />
                        </Grid>
                      )}

                      {jobDetails.noOfOffers && (
                        <Grid item xs={12} sm={6} md={4} mb={5}>
                          <TextField variant="standard" label="No of Offers" fullWidth value={jobDetails.noOfOffers} InputProps={{ disableUnderline: true, readOnly: true,
                            style:{marginBottom:'5px'}
                           }} 
                           InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}/>
                        </Grid>
                      )}
                      {jobDetails.jobLocation && (
                        <Grid item xs={12} sm={6} md={4} mb={5}>
                          <TextField variant="standard" label="Job Location" multiline fullWidth value={jobDetails.jobLocation} InputProps={{ disableUnderline: true, readOnly: true,
                            style:{marginBottom:'5px'} }} 
                          
                          InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}/>
                        </Grid>
                      )}
                    </>
                  )}
                </Box>






                <Box
                
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'left',
                  alignItems: 'left',
                  width: '100%',
                  flex:1,
                  flexGrow:'',
                  padding: '2px 1px 1px 20px',
                }}
                >

                  {jobDetails.skillsRequired && (
                    <Grid item xs={12} md={6}>
                      <TextField variant="standard" label="Skills Required" multiline fullWidth value={jobDetails.skillsRequired} InputProps={{ disableUnderline: true, readOnly: true }}
                       InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                       />
                    </Grid>
                  )}
                </Box>
                

              </Box>
            </Grid>
          )}
        </CardContent>
      </Card>
























      {jobStartUpDetails &&
        jobDetails &&
        ((jobDetails.assignment && jobDetails.assignment !== undefined && jobDetails.assignment !== '') ||
          (jobDetails.deadline && jobDetails.deadline !== undefined && jobDetails.deadline !== '') ||
          (jobDetails.selectionProcess && jobDetails.selectionProcess !== undefined && jobDetails.selectionProcess !== '')) && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontSize: '20px', color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
                Deadline and Selection Process
              </Typography>
              {loading || loading2 ? (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Box>
                  {jobDetails.assignment && jobDetails.assignment !== '' && jobDetails.assignment !== undefined && (
                    <TextField variant="standard" sx={{ mb: 2 }} label="Assignment" fullWidth value={jobDetails.assignment} InputProps={{ disableUnderline: true, readOnly: true }} />
                  )}
                  {jobDetails.deadline && jobDetails.deadline !== undefined && jobDetails.deadline !== '' && (
                    <TextField
                      variant="standard"
                      sx={{ mb: 2 }}
                      label="Application Deadline"
                      fullWidth
                      value={moment(jobDetails.deadline).format('MMMM Do YYYY, h:mm:ss a')}
                      InputProps={{ disableUnderline: true, readOnly: true,style: { color: 'red' } }}
                      InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded"}}}
                    />
                  )}
                  {jobDetails.selectionProcess && jobDetails.selectionProcess !== undefined && jobDetails.selectionProcess !== '' && (
                    <TextField variant="standard" label="Selection Process" multiline fullWidth value={jobDetails.selectionProcess} InputProps={{ disableUnderline: true, readOnly: true,style: { color: 'green' } }}
                    InputLabelProps={{style: {fontSize: '20px',fontWeight:"bold", color:"black",fontFamily:"sans-serif", fontStretch:"expanded" }}}
                    />
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      {jobStartUpDetails &&
        ((jobStartUpDetails.hrName && jobStartUpDetails.hrName !== undefined && jobStartUpDetails.hrName !== '') ||
          (jobStartUpDetails.hrEmail && jobStartUpDetails.hrEmail !== undefined && jobStartUpDetails.hrEmail !== '')) && (
          <Card sx={{ my: 2 }}>
            <CardContent>
              {loading || loading2 ? (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Box>
                  <Typography variant="h5" sx={{ mb: 2, fontSize: '20px', color: 'black', cursor: 'pointer', fontWeight: 'bold' }}>
                    HR/POC Details
                  </Typography>
                  <Grid container spacing={2}>
                    {jobStartUpDetails.hrName && jobStartUpDetails.hrName !== undefined && jobStartUpDetails.hrName !== '' && (
                      <Grid item xs={12} md={6}>
                        <TextField variant="standard" label="Name" fullWidth value={jobStartUpDetails.hrName} InputProps={{ disableUnderline: true, readOnly: true }} />
                      </Grid>
                    )}
                    {jobStartUpDetails.hrEmail && jobStartUpDetails.hrEmail !== undefined && jobStartUpDetails.hrEmail !== '' && (
                      <Grid item xs={12} md={6}>
                        <TextField variant="standard" label="Personal Email" fullWidth value={jobStartUpDetails.hrEmail} InputProps={{ disableUnderline: true, readOnly: true }} />
                      </Grid>
                    )}
                    {jobStartUpDetails.hrDesignation && jobStartUpDetails.hrDesignation !== undefined && jobStartUpDetails.hrDesignation !== '' && (
                      <Grid item xs={12} md={6}>
                        <TextField variant="standard" label="Designation" fullWidth value={jobStartUpDetails.hrDesignation} InputProps={{ disableUnderline: true, readOnly: true }} />
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
    </Container>
  );
}



