import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Bridge from '../components/Icons/Bridge';
import Logo from '../components/Icons/Logo';
import Modal from '../components/Modal';
import getBase64ImageUrl from '../utils/generateBlurPlaceholder';
import type { ImageProps } from '../utils/types';
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto';
import { ref, uploadBytes, getStorage, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { firebaseDB } from '../utils/firebase';
import { v4 as uuidV4 } from 'uuid';
import getResults from '../utils/cachedImages';
import CustomFileInput from '../components/CustomFileInput';
const Home: NextPage = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [fileInput, setFileInput] = useState<Blob>();
  const [images, setImages] = useState([]);

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  const imageListRef = ref(firebaseDB, 'guests/uploads');

  useEffect(() => {
    const getAllImages = async () => {
      const response = await listAll(imageListRef);
      // let id = 0;
      response.items.forEach(async (item, index) => {
        const imgUrl = await getDownloadURL(item);
        const { generation, timeCreated } = await getMetadata(item);
        console.log(timeCreated);

        setImages((prev) => [...prev, { id: timeCreated, imgUrl }]);
        // id++;
      });
    };

    getAllImages();

  }, []);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>Meguesta</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {/* {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )} */}

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content relative mb-5 flex flex-col items-center justify-end gap-4 overflow-hidden rounded-lg gradient-background px-6 pb-16 pt-10 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
            <h1 className="mb-4 text-base font-bold uppercase tracking-widest">
              Meguesta
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] mb-3">
              Upload your memories from the event and let us cherish the moments you captured
            </p>
            <CustomFileInput />
          </div>

          {images.sort(
            (a, b) => {
              // @ts-expect-error: Let's ignore a compile error like this unreachable code 
              return new Date(b.date) - new Date(a.date);
            }
          ).map(({ id, imgUrl }) => (
            <div key={id} className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
              <Image
                alt={`Photo taken at ${new Date(id)}`}
                className="transform rounded-lg brightness-100 transition will-change-auto group-hover:brightness-110 border border-gray-300"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                // placeholder="blur"
                // blurDataURL={blurDataUrl}
                src={`${imgUrl}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </div>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
       Made with ❤️ by <a href="https://www.instagram.com/pranesh.uwu/" className='font-bold underline'>Pranesh R</a>
      </footer>
    </>
  );
};

export default Home;

// export async function getStaticProps() {
//   const results = await getResults();
//   let reducedResults: ImageProps[] = []

//   let i = 0
//   for (let result of results) {
//     reducedResults.push({
//       id: i,
//       imgUrl: result.imgUrl
//     })
//     i++
//   }

//   const blurImagePromises = results.map((image: ImageProps) => {
//     return getBase64ImageUrl(image)
//   })
//   const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

//   for (let i = 0; i < reducedResults.length; i++) {
//     reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
//   }
//   return {
//     props:{
//       images : reducedResults
//     }
//   }
// }
