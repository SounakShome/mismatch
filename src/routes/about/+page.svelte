<script lang="ts">
    import { Bot } from "lucide-svelte";
  </script>
  
  <div class="min-h-screen bgimg text-white p-6 font-sans">
    <div class="max-w-4xl h-4xl mx-auto mt-32 mb-12">
      <div
        class="relative bg-black/50 rounded-lg p-8 border-2 border-blue-500 shadow-[0_0_30px_rgba(0,149,255,0.5)]"
      >
        <div class="text-center font-press space-y-6">
          <h2
            class="text-5xl font-bold text-white font-notable mb-4 sm:mb-6"
          >
            About Us
          </h2>
          <h3 class="text-2xl text-purple-300">Welcome to MISMATCH!</h3>
          <p class="text-purple-200/90 leading-relaxed max-w-2xl mx-auto">
            A one-of-a-kind hackathon hosted by the IEERAS Club of VIT Chennai!
          </p>
          <div class="space-y-4 text-purple-200/80">
            <p class="leading-relaxed max-w-2xl mx-auto">
              Mismatch is all about breaking boundaries, blending ideas, and
              creating innovative solutions by bringing together unique
              perspectives. Whether you're a coder, designer, strategist, or
              innovator, this is your chance to collaborate, experiment, and push
              the limits of creativity.
            </p>
            <p class="leading-relaxed max-w-2xl mx-auto">
              With real-world challenges and an open platform to showcase your
              groundbreaking ideas,<br /> Mismatch promises an experience like no
              other! Step out of your comfort zone, rethink possibilities, and
              build solutions that could <br />redefine the future.
            </p>
          </div>
          <p class="text-xl font-medium text-pink-400 mt-8">
            Let's mismatch, create, and reshape the world of tomorrow!
          </p>
        </div>
      </div>
    </div>
  
    <!-- div class="max-w-5xl mx-auto px-4">
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-5 space-y-8 pl-10">
          <div class="relative">
            <div class="absolute inset-0 bg-purple-600/30 rounded-xl blur-xl"></div>
            <div class="relative bg-black/90 rounded-xl p-6 border-2 border-purple-500">
              <p class="text-center text-purple-200/90 leading-relaxed">
                The IEERAS Club at VIT Chennai is a community of tech enthusiasts,
                innovators, and problem-solvers committed to fostering a culture
                of collaboration and learning.
              </p>
            </div>
          </div>
          <div class="space-y-4">
            <img
              src="/vit2.png"
              alt="VIT Chennai Campus"
              class="w-full h-48 object-cover rounded-tl-[6rem] border border-purple-500/50"
            />
          </div>
        </div>
        <div class="col-span-2 flex justify-center">
          <div class="w-px h-50 bg-purple-500/50"></div>
        </div>
        <div class="col-span-5 space-y-8">
          <div class="flex justify-end mb-8">
            <div class="pb-7 w-2xl">
              <img
                class="w-95 h-80 object-contain pb-2"
                src="/ras logo.png"
                alt="IEERAS Logo"
              />
            </div>
          </div>
          <div class="relative mt-8">
            <div class="absolute inset-0 bg-purple-600/30 rounded-xl blur-xl"></div>
            <div class="relative bg-black/90 rounded-xl p-6 border-2 border-purple-500">
              <p class="text-center text-purple-200/90 leading-relaxed">
                At VIT Chennai, a premier institute known for excellence in education and
                research, we aim to provide a platform for bright minds to shine.
              </p>
              <div class="absolute -bottom-6 -right-6">
                <img
                  src="/Controller.png"
                  class="w-12 h-12 text-purple-500 transform rotate-12"
                  alt="controller"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>

  <style>
    .bgimg {
        background-image: url("/about.gif");
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
    }
  </style>
  