'use client'
export default function BackimageDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="box cover">cover</div>
      <div className="box contain">contain</div>
      <div className="box repeat">repeat</div>
      <div className="box local">fixed</div>
      <div className="box gradient">gradient</div>
      <div className="box blend">blend mode</div>

      <style jsx>{`
        .box {
          height: 200px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
        }
        .cover {
          background: url("https://picsum.photos/500/300") no-repeat center center / cover;
        }
        .contain {
          background: url("https://picsum.photos/500/301") no-repeat center center / contain;
          background-color: #333;
        }
        .repeat {
          background: url("https://picsum.photos/100/100") repeat;

          background-attachment: fixed;
        }
        .local {
          background: url("https://picsum.photos/800/400") no-repeat center center / cover;
          background-attachment: local;
        }
        .gradient {
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
        }
        .blend {
          background: 
            url("https://picsum.photos/500/303") no-repeat center center  / cover,
            linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2));
          background-blend-mode: multiply;
        }
      `}</style>
    </div>
  );
}
