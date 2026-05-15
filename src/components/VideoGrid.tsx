type Video = {
  title: string;
  youtubeId: string;
};

type Props = {
  videos: Video[];
};

export default function VideoGrid({
  videos,
}: Props) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {videos.map((video) => (
        <a
          key={video.youtubeId}
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noreferrer"
          className="group block"
        >
          <div className="relative aspect-video overflow-hidden border border-black bg-neutral-100">
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt={video.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black bg-white text-black">
                ▶
              </div>
            </div>
          </div>

          <h3 className="mt-3 text-base font-bold">
            {video.title}
          </h3>
        </a>
      ))}
    </div>
  );
}