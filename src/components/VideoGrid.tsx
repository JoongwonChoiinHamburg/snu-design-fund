"use client";

import { useState } from "react";
import LayerPopup from "./LayerPopup";

type InterviewQA = {
  q: string;
  a: string;
};

type Video = {
  title: string;

  coverImage: string;
  interviewImage: string;

  profile: {
    name: string;
    description: string;
    donationAmount?: string;
    quote: string;
    introduction?: string;
  };

  qa: {
    q: string;
    a: string;
  }[];
};

type Props = {
  videos: Video[];
};

const PLACEHOLDER_COUNT = 3;

export default function VideoGrid({ videos }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const items = [
    ...videos,
    ...Array.from({ length: Math.max(0, PLACEHOLDER_COUNT - videos.length) }),
  ].slice(0, PLACEHOLDER_COUNT);

  return (
    <>
      <div className="grid gap-8 px-5 md:grid-cols-3 md:gap-20 md:px-0">
        {items.map((item, index) => {
       if (!item) {
  const placeholderIndex = index - videos.length;

  return (
    <div
      key={`placeholder-${index}`}
      className={placeholderIndex > 0 ? "hidden md:block" : ""}
    >
      <PlaceholderCard />
    </div>
  );
}

          const video = item as Video;

          return (
            <button
              key={video.title}
              type="button"
              onClick={() => setSelectedVideo(video)}
              className="group block text-left"
            >
              <div className="relative aspect-video overflow-hidden border-b-2 border-black bg-neutral-100">
                <img
                  src={video.coverImage}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center">
  
                </div>
              </div>

              <h3 className="mt-3 text-xl font-bold">
                {video.title}
              </h3>
            </button>
          );
        })}
      </div>

<LayerPopup
  open={!!selectedVideo}
  onClose={() => setSelectedVideo(null)}
>
  {selectedVideo && (
    <div className="max-w-[900px] text-[var(--color-grey)]">
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-3xl">
            {selectedVideo.title}
          </h3>
        </div>


      </div>

      <img
        src={selectedVideo.interviewImage}
        alt={selectedVideo.title}
        className="max-h-[70vh] w-full object-contain"
      />

      <div >

<div >
  <blockquote className="pattern-highlight-quote font-display text-2xl leading-15 md:leading-relaxed md:text-3xl">
    “{selectedVideo.profile.quote}”
  </blockquote>

<div className="mt-8  bg-white p-5 md:p-8">
  <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
    <h4 className="font-display text-2xl leading-none md:text-3xl">
      {selectedVideo.profile.name}
    </h4>

    {selectedVideo.profile.donationAmount && (
      <span className="inline-flex rounded bg-[var(--color-grey)] px-2.5 py-1 text-xs font-bold text-white md:text-sm">
        {selectedVideo.profile.donationAmount} 기부
      </span>
    )}
  </div>

  <p className="mt-3 max-w-[600px] text-base leading-6 text-[var(--color-grey)]/60">
    {selectedVideo.profile.description}
  </p>

  {selectedVideo.profile.introduction && (
    <div className="mt-7 max-w-[700px] whitespace-pre-line leading-7 text-[var(--color-grey)]/75 md:mt-9 md:text-lg
 md:leading-8">
      {selectedVideo.profile.introduction}
    </div>
  )}
</div>
</div>
      </div>

      <div className="mt-10 space-y-8">
        {selectedVideo.qa?.map((item, index) => (
          <div
            key={index}
           
          >
<div className="mb-5 text-lg font-bold leading-[1.9] md:text-2xl">
  <span className="pattern-highlight-question">
    <span className="mr-2 font-display md:mr-3">Q</span>
    {item.q}
  </span>
</div>

            <div className="ml-9 whitespace-pre-line md:text-lg max-w-[700px] leading-relaxed text-[var(--color-grey)]/75">
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</LayerPopup>
    </>
  );
}

function PlaceholderCard() {
  return (
    <div className="block text-left">
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <img
          src="/interviews/placeholder.jpg"
          alt=""
          className=" h-full w-full object-cover"
        />
      </div>

      <h3 className="mt-3 text-xl font-bold text-[var(--color-grey)]/50">
        당신의 따뜻한 이야기를 기다립니다.
      </h3>
    </div>
  );
}