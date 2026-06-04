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
    quote: string;
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
      <div className="grid gap-20 md:grid-cols-3">
        {items.map((item, index) => {
          if (!item) {
            return <PlaceholderCard key={`placeholder-${index}`} />;
          }

          const video = item as Video;

          return (
            <button
              key={video.title}
              type="button"
              onClick={() => setSelectedVideo(video)}
              className="group block text-left"
            >
              <div className="relative aspect-video overflow-hidden border border-black bg-neutral-100">
                <img
                  src={video.coverImage}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black bg-white text-black">
                    +
                  </div>
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
    <div className="max-w-[900px] text-black">
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-3xl">
            {selectedVideo.title}
          </h3>
        </div>

        <button
          type="button"
          className="shrink-0 border border-black px-3 py-1 text-sm"
          onClick={() => setSelectedVideo(null)}
        >
          닫기
        </button>
      </div>

      <img
        src={selectedVideo.interviewImage}
        alt={selectedVideo.title}
        className="max-h-[70vh] w-full object-contain"
      />

      <div className="mt-10 border-t border-black pt-8">
        <h4 className="font-display text-2xl">
  {selectedVideo.profile.name}
</h4>

<p className="mt-2 text-sm leading-relaxed text-black/60">
  {selectedVideo.profile.description}
</p>

<blockquote className="mt-6 border-l-2 border-black pl-5 text-xl leading-relaxed">
  “{selectedVideo.profile.quote}”
</blockquote>
      </div>

      <div className="mt-10 space-y-8">
        {selectedVideo.qa?.map((item, index) => (
          <div
            key={index}
            className="border-t border-black pt-6"
          >
            <div className="mb-3 flex gap-4">
              <div className="shrink-0 font-display text-xl">
                Q
              </div>

              <div className="text-xl font-bold leading-snug">
                {item.q}
              </div>
            </div>

            <div className="ml-9 whitespace-pre-line leading-relaxed text-black/75">
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

      <h3 className="mt-3 text-xl font-bold text-black/50">
        당신의 따뜻한 이야기를 기다립니다.
      </h3>
    </div>
  );
}