"use client"
import React,{useState,useEffect} from "react"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import axios from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import StarRateIcon from '@mui/icons-material/StarRate';
import {useDispatch} from 'react-redux' 
import { add } from './Redux/CartSlice'


export default function Home() {
  const [products,setProduct]=useState([])
  const [productsByType,setProductsByType] = useState([])
  const [productsType,setProductsType] = useState([])
  const [productTypeState,setProductTypeState]=useState("")
  const [addProduct,setAddProduct] = useState({})
  const dispatch = useDispatch()

  const handleAddProduct = (product) =>{
    dispatch(add(product))
  }

  const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products")
    const data = await res.data
    const dataType = [... new Set(data.map(x=>x.category))];

    setProduct(data)
    setProductsType(dataType)
    setProductsByType(data)
  }

  const filterTypeProduct = (type) => {
    let data = products.filter((e) => {
      if(type != productTypeState){
        if(e.category == type){
          setProductTypeState(type)
          return e
        }
      }else{
        setProductTypeState("")
        return e
      }
    
      
  });
  setProductsByType(data)
  }
  
  useEffect(()=>{
    getProducts()

  },[])

  return (
    <div>
      <Box sx={{ overflow: 'hidden' }}>
        
        <Grid container sx={{px:"1%"}} justifyContent={'center'} >
          <Grid sx={{pt:2}} >
          {(productsType.length == 0 ? 
              <Grid container >
               {Array.from(new Array(4)).map((e,index)=>(
                    <Box key={index} sx={{mx:2}}  >
                      <Skeleton animation="wave" height={36} width={150}/>
                    </Box>
                ))
                }
              </Grid>
              :<>
               <Grid container  >
                  {productsType.map((e,index)=>(
                      <Box key={index} sx={{mx:2}}  >
                       <Button variant="text"  onClick={()=>filterTypeProduct(e)}  sx={{py:0,height:"35px",fontWeight: 'bold',"&.MuiButton-text":{color:`${productTypeState == e ?'#fff':"#000"}`,backgroundColor:`${productTypeState == e ?'#000':"none"}`,"&:hover":{borderColor:'black',backgroundColor:"#000",color:'#fff',fontWeight: 'bold'}}}} >
                          {e}
                      </Button>
                      </Box>
                    ))
                  }
                </Grid>
              </>
          )}
          </Grid>
            <Grid container sx={{mx:"4%"}}>
            {(productsByType.length == 0 ? Array.from(new Array(10)) : productsByType).map((item, index) => (
            <Box key={index} sx={{ width: 300, mx: 1, my: 1 }}>
              <Card>
                <CardContent sx={{height:520,p:0}}>
                
                {!item ? (
                    <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
                  ) : (
                    
                    <Box >
                      <Box sx={{pt:2,pl:2}}>
                        <Chip label={item.category} size="small"/>
                      </Box>
                    <Box sx={{display:'flex',justifyContent:'center',py:2,height:350}}>
                      
                      <img
                        style={{ width: 210, height: 250 }}
                        alt={item.image}
                        src={item.image}
                      />
                    </Box>
                    </Box>
                    
                  )}
                {!item ? (
                  <React.Fragment>
                    <Box sx={{p:2,pt:1.5}} >
                      <Skeleton animation="wave" height={30} />
                      <Skeleton animation="wave" height={20} width="50%" style={{marginTop:-5,marginBottom:2}} />
                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Skeleton animation="wave" height={50} width="45%"/>
                        <Skeleton animation="wave" height={50} width="45%"/>
                      </Box>
                      
                    </Box>
                  </React.Fragment>
                ) : (
                  <Box sx={{p:2,pt:1.5,pl:2}} >
                    <Typography sx={{fontWeight: 'bold'}}>
                      {item.title.length  > 27
                      ?<>{item.title.substring(0, 27)}...</>
                      :<>{item.title}</>
                      }
                      
                    </Typography>
                    <Box sx={{display:'flex'}}>
                    <Box color={"#EFCE3B"}  ><StarRateIcon /></Box>
                    <Typography sx={{fontWeight: 'bold',fontSize:14 ,pt:0.4,px:0.5}}>{item.rating.rate}</Typography>
                    <Typography sx={{fontWeight: 'bold',fontSize:14 ,pt:0.4}}>•</Typography>
                    <Typography sx={{fontWeight: 'bold',fontSize:14 ,pt:0.4,px:0.5}}>{item.rating.count} reviews</Typography>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'space-between',pt:1,alignItems:'center' }}>
                      <Typography sx={{fontWeight: 'bold',fontSize:20 ,px:'8px',py:'6px'}}>${item.price}</Typography>
                      <Button variant="text" onClick={()=>handleAddProduct(item)} sx={{py:0,height:"35px","&.MuiButton-text":{color:'#fff',border:1,backgroundColor:"#000000","&:hover":{borderColor:'black',backgroundColor:"#ffffff",color:'#000000',border:1,fontWeight: 'bold'}}}} >
                        Add to cart
                      </Button>
                    </Box>
                  </Box>
                )}
                </CardContent>
              </Card>
           
            </Box>
          ))}
            </Grid>
          
        </Grid>
      </Box>
      
      
      

    </div>
  )
}
