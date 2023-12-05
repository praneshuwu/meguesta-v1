import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '../../components/Carousel'
import getResults from '../../utils/cachedImages'
import cloudinary from '../../utils/cloudinary'
import getBase64ImageUrl from '../../utils/generateBlurPlaceholder'
import type { ImageProps } from '../../utils/types'
import { use, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter()
  const { photoId } = router.query
  let index = Number(photoId)
  // const [currentPhoto,setCurrentPhoto] = useState();
  const params = useParams()

  useEffect(()=>{
    const getCurrentPhoto = async ()=>{
      const results = await getResults();
      const fetchedCurrentPhoto = results?.find(
        (img) => img.id === Number(params.id)
      )
      console.log(results);
      // currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
    }

    getCurrentPhoto();
  
  },[])

  const currentPhotoUrl = currentPhoto.imgUrl;

  console.log(currentPhoto);
  
  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const results = await getResults();

  console.log([results]);
  

  let reducedResults: ImageProps[] = []
  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      imgUrl: result.imgUrl
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId)
  );
  console.log(currentPhoto);
  
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  }
}

export async function getStaticPaths() {
  const results = await getResults();

  let fullPaths = []
  for (let i = 0; i < results.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } })
  }

  return {
    paths: fullPaths,
    fallback: false,
  }
}
